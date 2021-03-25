import React from "react";
import {
  BottomNavigation, BottomNavigationAction,
  Grid
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const ChoicesTemplate = (): JSX.Element => {
  /**
   * Add new template set.
   */
  const handleAddTemplate = () => {

  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>選択肢テンプレート</h1>
      </Grid>
      <Grid item xs={12}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="テンプレート追加"
            icon={<AddCircleIcon />}
            onClick={handleAddTemplate}
          />
        </BottomNavigation>
      </Grid>

    </Grid>
  );
}
ChoicesTemplate.displayName = ChoicesTemplate.name;
