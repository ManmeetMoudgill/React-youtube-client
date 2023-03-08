import React, { memo, useEffect } from "react";
import { useState } from "react";
import { IconButton, useEventCallback } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/config";
import { useApi } from "../shell/hooks/custom-http";
import { Video } from "../models/video";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";
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

const UploadVideo = ({ setOpenDialog }: Props) => {
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imgPerc, setImgPerc] = useState<number>(0);
  const [videoPerc, setVideoPerc] = useState<number>(0);
  const [storageDirPlusFileNameData, setStorageDirPlusFileNameData] = useState<
    string | null
  >(null);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState<Array<string> | []>([]);

  const { user } = useSelector((state: RootState) => state?.user);

  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
    }
  };

  const handeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(","));
  };

  //function to upload the image and video to firebase storage
  const uploadFile = useEventCallback((file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageDirPlusFileName = `${
      urlType === "imgUrl" ? "images/" : "videos/"
    }${fileName}`;
    setStorageDirPlusFileNameData(storageDirPlusFileName);
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

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video, uploadFile]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img, uploadFile]);

  const { makeCall: createVideo } = useApi<UploadVideoResponse>({
    url: "/videos/",
    method: "post",
  });

  const navigate = useNavigate();
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
        if (storageDirPlusFileNameData) {
          const storage = getStorage(app);

          // Create a reference to the file to delete
          const desertRef = ref(storage, storageDirPlusFileNameData);

          // Delete the file
          await deleteObject(desertRef);
        }
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
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input type="file" accept="video/*" onChange={handleVideoFile} />
        )}
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
          rows={8}
        />
        <Input
          type="text"
          onChange={handleTags}
          placeholder="Separate the tags with commas."
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input type="file" accept="image/*" onChange={handleImgFile} />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default memo(UploadVideo);
