import {video,music,image} from "../File/FileModal";

// header default image
export const isFileByUrl = (filename) => {
  const typeFilesImage = ["jpg", "jpeg", "png"];
  return typeFilesImage.includes(filename.split(".").pop());
};

export const isFile = (filename) => {
  const files = [...video,...music,...image];
  return files.includes(filename.split(".").pop());
}