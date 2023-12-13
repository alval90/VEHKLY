import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;

const getYearRange = (): number[] => {
  const yearRange: number[] = [];

  const currentYear: number = new Date().getFullYear();
  const from: number = currentYear - 2;
  const to: number = currentYear + 2;
  for (let i = from; i <= to; i++) {
    yearRange.push(i);
  }

  return yearRange;
};

export default function YearMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { year } = useParams();
  const navigate = useNavigate();

  const options = getYearRange();

  const yearParsed: number = year ? parseInt(year) : new Date().getFullYear();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYearClick = (
    e: React.MouseEvent<HTMLLIElement>,
    year: number,
  ) => {
    const target = e.target as EventTarget & {
      selected: boolean | undefined;
    };
    if (target?.selected) {
      return;
    }
    navigate(`/mealplan/${year}/1`);
    handleClose();
  };

  return (
    <div>
      <p
        onClick={handleClick}
        style={{ color: "blue", fontWeight: 700, cursor: "pointer" }}
      >
        {year}
      </p>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === yearParsed}
            onClick={(e) => handleYearClick(e, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
