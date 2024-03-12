import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const labelStyles = {
  fontSize: "0.75rem",
  marginRight: "4px",
};

const HugButton = ({
  onClick,
  label,
  color,
}: {
  onClick: () => Promise<void>;
  label: string;
  color: "primary" | "warning";
}) => {
  return (
    <IconButton onClick={onClick} aria-label="Favorite">
      <span style={labelStyles}>{label}</span>
      <FavoriteIcon color={color} />
    </IconButton>
  );
};

export default HugButton;
