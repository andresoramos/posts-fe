import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMoreProps, PostCardProps } from "./PostCard.types";
import IconButton from "@mui/material/IconButton";
import { postDataToApi } from "../../http/post";
import HugButton from "../HugButton/HugButton";

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HugsDiv = styled("div")({
  fontSize: "0.75rem",
  marginRight: "8px",
});

export default function PostCard(props: PostCardProps) {
  const { title, patient_description, url, num_hugs } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [hugCount, setHugCount] = React.useState(num_hugs);
  const [hugColor, setHugColor] = React.useState<"primary" | "warning">(
    "primary"
  );

  const handleHugClick = async () => {
    setHugCount(`${Number(hugCount) + 1}`);
    postDataToApi(`${process.env.REACT_APP_BASE_URL}/posts`!, { id: url });
    setHugColor("warning");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderDescription = () => {
    const maxLength = 100;
    if (!expanded && patient_description.length > maxLength) {
      return patient_description.substring(0, maxLength) + "...";
    }
    return patient_description;
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: "1em" }}>
      <CardHeader sx={{ textAlign: "left" }} title={title} />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          {renderDescription()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <HugButton onClick={handleHugClick} label={hugCount} color={hugColor} />
        {patient_description.length > 100 && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
    </Card>
  );
}
