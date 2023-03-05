import React from "react";
import styled from "styled-components";
import "./css/categories-scroll/index.css";
type Props = {};
const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  max-width: 100vw;
`;

const CategoryButtonItem = styled.button`
  min-width: 5rem;
  min-height: 2.5rem;
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
    id: 4,
    name: "Java",
  },
  {
    id: 5,
    name: "Laravel",
  },
  {
    id: 6,
    name: "React native",
  },
  {
    id: 5,
    name: "Flutter",
  },
  {
    id: 6,
    name: "Coding",
  },
  {
    id: 7,
    name: "Programming",
  },
  {
    id: 8,
    name: "System",
  },
  {
    id: 9,
    name: "IAS",
  },
  {
    id: 10,
    name: "IPS",
  },
  {
    id: 11,
    name: "IFS",
  },
  {
    id: 12,
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
