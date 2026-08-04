import styled from "styled-components/native";
import { IMovie } from "../types/movies";
import { makeImagePath } from "../utils/makeImagePath";

interface HorizontalMediaListProps {
  posterPath: string;
  title: string;
  rating: number;
}
const HItem = styled.View`
  margin-right: 15px;
  margin-top: 8px;
`;
const HImage = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const HContent = styled.View`
  flex-direction: column;
  width: 120px;
  margin-bottom: 5px;
`;
const HTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
  font-weight: bold;
  text-align: center;
`;
const HRate = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 13px;
  text-align: center;
`;

export default function HorizontalMediaList({
  posterPath,
  title,
  rating,
}: HorizontalMediaListProps) {
  return (
    <HItem>
      <HImage source={{ uri: makeImagePath(posterPath) }} />
      <HContent>
        <HTitle numberOfLines={1} ellipsizeMode="tail">
          {title.length > 15 ? `${title.slice(0, 15)}...` : title}
        </HTitle>
        <HRate>⭐️ {rating.toFixed(1)} / 10</HRate>
      </HContent>
    </HItem>
  );
}
