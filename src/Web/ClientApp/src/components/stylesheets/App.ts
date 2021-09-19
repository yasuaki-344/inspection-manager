import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sheetLabel: {
      backgroundColor: theme.palette.primary.main,
      color: "#FFFFFF",
      fontSize: 24,
      padding: 4,
    },
    sheetElement: {
      margin: 4,
      width: 250,
    },
    sheetIdElement: {
      margin: 4,
      width: 330,
    },
  })
);

export const LinkNavItem = {
  color: '#000000',
  textDecoration: 'none',
}
export const LinkNavTitle = {
  color: '#FFFFFF',
  textDecoration: 'none',
}
