import React from "react";
import styled from "styled-components";
import "./css/index.css";
type Props = {};
const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  max-width: 100vw;
  @media (min-width: 320px) and (max-width: 720px) {
    padding-bottom: 0.1rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    padding-bottom: 0.2rem;
  }
`;

const CategoryButtonItem = styled.button`
  width: 5rem;
  height: 2.5rem;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  background-color: whitesmoke;
  margin: 0.5rem 1.5rem 0.5rem 0rem;
  padding: 0 1rem 0 1rem;
  border: transparent;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  @media (min-width: 320px) and (max-width: 720px) {
    min-width: 4rem;
    font-size: 0.6rem;
    height: 1.6rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    min-width: 5rem;
    font-size: 0.8rem;
    height: 1.6rem;
  }
  @media (min-width: 1001px) and (max-width: 1200px) {
    min-width: 7rem;
    font-size: 0.8rem;
    height: 1.6rem;
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    min-width: 6rem;
    font-size: 0.8rem;
    height: 2.5rem;
  }
`;

const CategoriesData = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Music",
  },
  {
    id: 3,
    name: "Javascript",
  },
  {
    id: 4,
    name: "Php",
  },
  {
    id: 5,
    name: "Java",
  },
  {
    id: 6,
    name: "Laravel",
  },
  {
    id: 7,
    name: "React native",
  },
  {
    id: 8,
    name: "Flutter",
  },
  {
    id: 9,
    name: "Coding",
  },
  {
    id: 10,
    name: "Programming",
  },
  {
    id: 11,
    name: "System",
  },
  {
    id: 12,
    name: "IAS",
  },
  {
    id: 13,
    name: "IPS",
  },
  {
    id: 14,
    name: "IFS",
  },
  {
    id: 15,
    name: "IRS",
  },
];
const CategorisSroll = (props: Props) => {
  return (
    <Container className="filter--container">
      {CategoriesData?.map((item) => {
        return <CategoryButton key={item?.id} name={item?.name} />;
      })}
    </Container>
  );
};

interface CategoryButtonProps {
  name: string;
}
const CategoryButton = ({ name }: CategoryButtonProps) => {
  return (
    <>
      <CategoryButtonItem>{name}</CategoryButtonItem>
    </>
  );
};
export default CategorisSroll;
