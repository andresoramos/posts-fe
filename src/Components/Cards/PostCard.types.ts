import { IconButtonProps } from "@mui/material/IconButton";

export interface PostCardProps {
  title: string;
  patient_description: string;
  num_hugs: string;
  url: string;
}

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
