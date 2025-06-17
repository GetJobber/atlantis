import { Box, Icon, Typography } from "@jobber/components";
import { useState } from "react";
import { SearchBox } from "./SearchBox";
import styles from "./SearchButton.module.css";

export const SearchButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={styles.searchButton}
        aria-label="Search"
      >
        <Icon name="search" color="greyBlue" />
        <span className={styles.searchButtonText}>
          <Typography size={"base"} textColor={"textSecondary"}>
            Search
          </Typography>
        </span>
        <div className={styles.searchKeyIndicator}>/</div>
      </button>
      <SearchBox open={open} setOpen={setOpen} />
    </Box>
  );
};
