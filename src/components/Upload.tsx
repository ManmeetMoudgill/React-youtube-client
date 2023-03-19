import React, { memo } from "react";
import { useState } from "react";
import { IconButton, LinearProgress, useEventCallback } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import app from "../firebase/config";
import { useApi } from "../shell/hooks/custom-http";
import { Video } from "../models/video";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button as MuiButton } from "@mui/material";
import styled from "styled-components";
import {
  Container,
  Wrapper,
  Close,
  Title,
  Input,
  Desc,
  Button,
  Label,
} from "./styled-components/Upload";
type Props = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

interface UploadVideoResponse {
  message: string;
  video: Video;
  status: number;
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UploadVideo = ({ setOpenDialog }: Props) => {
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imgPerc, setImgPerc] = useState<number>(0);
  const [videoPerc, setVideoPerc] = useState<number>(0);
  const [urls, setUrls] = useState<{ imgUrl: string; videoUrl: string }>({
    imgUrl: "",
    videoUrl: "",
  });
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState<Array<string> | []>([]);

  const { user } = useSelector((state: RootState) => state?.user);

  const handeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = useEventCallback((file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageDirPlusFileName = `${
      urlType === "imgUrl" ? "images/" : "videos/"
    }${fileName}`;

    setUrls((prev) => ({ ...prev, [urlType]: storageDirPlusFileName }));
    const storageRef = ref(storage, storageDirPlusFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
      },
      (error) => {
        createToastError(error.message, "error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  });

  const { makeCall: createVideo } = useApi<UploadVideoResponse>({
    url: "/videos/",
    method: "post",
  });

  const navigate = useNavigate();
  const removeVideoFromFirebase = useEventCallback(() => {
    if (urls?.videoUrl !== "") {
      const storage = getStorage(app);
      // Create a reference to the file to delete
      const desertRef = ref(storage, urls?.videoUrl);

      // Delete the file
      deleteObject(desertRef);
    }
  });

  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoPerc(0);
      setVideo(e.target.files[0]);
      removeVideoFromFirebase();
    }
  };

  const handleImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgPerc(0);
      setImg(e.target.files[0]);
      removeImageFromFirebase();
    }
  };
  const removeImageFromFirebase = useEventCallback(() => {
    if (urls?.imgUrl !== "") {
      const storage = getStorage(app);
      // Create a reference to the file to delete
      const desertRef = ref(storage, urls?.imgUrl);

      // Delete the file
      deleteObject(desertRef);
    }
  });

  const handleUpload = useEventCallback(() => {
    if (imgPerc !== 100 || videoPerc !== 100) {
      createToastError("Wait for the uploading to be completed", "error");
      return;
    }
    createVideo({
      data: { ...inputs, tags, userId: user?._id },
    })
      .then((res) => {
        const { video } = res as UploadVideoResponse;
        if (res?.status === HTTP_RESPONSE_STATUS_CODE.OK) {
          createToastError("Video uploaded successfully", "success");

          setOpenDialog(false);
          navigate(`/video/${video._id}`);
        }
      })
      .catch(async () => {
        removeImageFromFirebase();
        removeVideoFromFirebase();
      });
  });

  return (
    <Container>
      <Wrapper>
        <Close>
          <IconButton color="warning" onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc !== 100 && videoPerc !== 0 && (
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={videoPerc}
          />
        )}
        <Input type="file" accept="video/*" onChange={handleVideoFile} />
        <ButtonContainer>
          {videoPerc !== 100 && video ? (
            <MuiButton
              startIcon={<FileUploadIcon />}
              onClick={() => {
                uploadFile(video, "videoUrl");
              }}
            >
              Upload Video
            </MuiButton>
          ) : undefined}

          {videoPerc === 100 && video && urls?.videoUrl ? (
            <MuiButton
              startIcon={<DeleteIcon />}
              onClick={() => {
                setVideo(null);
                setVideoPerc(0);
                removeVideoFromFirebase();
              }}
            >
              Delete Video
            </MuiButton>
          ) : undefined}
        </ButtonContainer>

        <Input
          type="text"
          onChange={handeChange}
          placeholder="Title"
          name="title"
        />
        <Desc
          placeholder="Description"
          onChange={handeChange}
          name="description"
          rows={4}
        />
        <Input
          type="text"
          onChange={handleTags}
          placeholder="Separate the tags with commas."
        />
        <Label>Thumbnail:</Label>
        {imgPerc !== 100 && imgPerc !== 0 && (
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={imgPerc}
          />
        )}
        <Input type="file" accept="image/*" onChange={handleImgFile} />
        <ButtonContainer>
          {imgPerc !== 100 && img ? (
            <MuiButton
              startIcon={<FileUploadIcon />}
              onClick={() => {
                uploadFile(img, "imgUrl");
              }}
            >
              Upload Img
            </MuiButton>
          ) : undefined}
          {imgPerc === 100 && img && urls?.imgUrl ? (
            <MuiButton
              startIcon={<DeleteIcon />}
              onClick={() => {
                setImg(null);
                setImgPerc(0);
                removeImageFromFirebase();
              }}
            >
              Delete Img
            </MuiButton>
          ) : undefined}
        </ButtonContainer>
        <Button onClick={handleUpload}>Create a video</Button>
      </Wrapper>
    </Container>
  );
};

export default memo(UploadVideo);
