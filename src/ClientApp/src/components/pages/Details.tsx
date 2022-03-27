import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  CircularProgress,
  List,
  ListItem,
  Typography,
  ListItemText,
  Container,
} from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import nameof from "ts-nameof.macro";
import { useInputTypes } from "../../entities";
import { TopPageLink } from "../utilities";
import { IInspectionSheetInteractor } from "../../interfaces";
import { useDIContext } from "../../container";
import { Equipment, InspectionItem } from "../../typescript-fetch";

interface InspectionItemInfoProps {
  inspectionItem: InspectionItem;
}

interface EquipmentRowProps {
  equipment: Equipment;
}

const InspectionItemInfo = (props: InspectionItemInfoProps): JSX.Element => {
  const { inspectionItem } = props;

  return (
    <List disablePadding>
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="点検項目ID" />
        <Typography variant="body2">
          {inspectionItem.inspectionItemId}
        </Typography>
      </ListItem>
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="点検項目" />
        <Typography variant="body2">
          {inspectionItem.inspectionContent}
        </Typography>
      </ListItem>
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="点検タイプ" />
        <Typography variant="body2">
          {
            useInputTypes.filter((e) => e.value === inspectionItem.inputType)[0]
              .label
          }
        </Typography>
      </ListItem>
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="選択肢" />
        <Typography variant="body2">
          {inspectionItem.choices.map((x) => x.description).join(",")}
        </Typography>
      </ListItem>
    </List>
  );
};

const EquipmentRow = (props: EquipmentRowProps): JSX.Element => {
  const { equipment } = props;

  return (
    <TreeItem
      nodeId={`${equipment.equipmentId}`}
      label={<Typography variant="body2">{equipment.equipmentName}</Typography>}
    >
      <TreeItem
        nodeId={`${equipment.equipmentId}-detail`}
        label={
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="点検機器ID" />
              <Typography variant="body2">
                {props.equipment.equipmentId}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText>点検機器名</ListItemText>
              <Typography variant="body2">
                {props.equipment.equipmentName}
              </Typography>
            </ListItem>
          </List>
        }
      />
      <TreeItem
        nodeId={`${equipment.equipmentId}-items`}
        label={
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            点検項目情報
          </Typography>
        }
      />
      {equipment.inspectionItems.map((item: InspectionItem) => (
        <TreeItem
          nodeId={`item-${item.inspectionItemId}`}
          label={
            <Typography variant="body2">{item.inspectionContent}</Typography>
          }
        >
          <TreeItem
            nodeId={`item-${item.inspectionItemId}-detail`}
            label={<InspectionItemInfo inspectionItem={item} />}
          />
        </TreeItem>
      ))}
    </TreeItem>
  );
};

export const Details = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const inject = useDIContext();

  const useCase: IInspectionSheetInteractor = inject(
    nameof<IInspectionSheetInteractor>()
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    useCase
      .fetchInspectionSheetById(sheetId)
      .then(() => setLoading(false));
  }, [sheetId]);

  const displayData = loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Typography variant="h5" gutterBottom>
        点検シート情報
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="点検シートID" />
          <Typography variant="body2">{sheetId}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText>シート名</ListItemText>
          <Typography variant="body2">
            {useCase.sheet.sheetName}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText>点検グループ</ListItemText>
          <Typography variant="body2">
            {useCase.groupName(useCase.sheet.inspectionGroupId)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText>点検種別</ListItemText>
          <Typography variant="body2">
            {useCase.typeName(useCase.sheet.inspectionTypeId)}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        点検機器情報
      </Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {useCase.sheet.equipments.map((equipment: Equipment) => (
          <EquipmentRow key={equipment.equipmentId} equipment={equipment} />
        ))}
      </TreeView>
    </>
  );
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          点検シート詳細
        </Typography>
        {displayData}
        <TopPageLink />
      </Paper>
    </Container>
  );
};
Details.displayName = Details.name;
