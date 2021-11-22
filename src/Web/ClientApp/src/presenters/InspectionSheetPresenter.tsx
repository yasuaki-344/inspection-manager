import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { InputStyle } from "../components/stylesheets";
import { CancelIconButton } from "../components/utilities";
import {
  Choice,
  Equipment,
  InspectionGroup,
  InspectionItem,
  InspectionSheet,
  InspectionType,
  useInputTypes,
} from "../entities";
import {
  IInspectionSheetPresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
  IInspectionItemInteractor,
} from "../interfaces";

export class InspectionSheetPresenter implements IInspectionSheetPresenter {
  readonly selectionSheets: InspectionSheet[];

  readonly sheetId: number;

  readonly sheetName: string;

  readonly groupId: number;

  readonly groups: InspectionGroup[];

  readonly typeId: number;

  readonly types: InspectionType[];

  readonly equipments: Equipment[];

  readonly item: InspectionItem;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  private readonly itemUseCase: IInspectionItemInteractor;

  /**
   * Initializes a new instance of CreatePresenter class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   * @param itemUSeCase Object implements IInspectionItemInteractor interface.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor,
    itemUseCase: IInspectionItemInteractor
  ) {
    this.sheetUseCase = sheetUseCase;
    this.itemUseCase = itemUseCase;

    this.selectionSheets = sheetUseCase.sheets;
    this.sheetId = sheetUseCase.sheet.sheetId;
    this.sheetName = sheetUseCase.sheet.sheetName;
    this.groupId = sheetUseCase.sheet.inspectionGroupId;
    this.groups = groupUseCase.groups;
    this.typeId = sheetUseCase.sheet.inspectionTypeId
    this.types = typeUseCase.types;
    this.equipments = sheetUseCase.sheet.equipments;
    this.item = itemUseCase.inspectionItem;
  }

  isValidInspectionItem(): boolean {
    return this.itemUseCase.isValidInspectionItem();
  }

  getItemEditContent(onTemplateSelectClick: () => void): JSX.Element {
    return (
      <Grid container spacing={1} sx={{ pt: 1.5 }}>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            fullWidth
            autoFocus
            label="点検項目"
            variant="outlined"
            size="small"
            name="inspectionContent"
            value={this.itemUseCase.inspectionItem.inspectionContent}
            onChange={(e) => this.itemUseCase.updateField(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            fullWidth
            select
            label="点検タイプ"
            variant="outlined"
            size="small"
            name="inputType"
            value={this.itemUseCase.inspectionItem.inputType}
            onChange={(e) => this.itemUseCase.updateField(e)}
          >
            {useInputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {this.itemUseCase.inspectionItem.inputType !== 3 ? (
          <></>
        ) : (
          <>
            {this.itemUseCase.inspectionItem.choices.map(
              (choice: Choice, index: number) => (
                <Grid item xs={12} key={choice.orderIndex}>
                  <Box sx={InputStyle}>
                    <TextField
                      required
                      id="outlined-required"
                      label={`選択肢${index + 1}`}
                      variant="outlined"
                      size="small"
                      name="choice"
                      value={choice.description}
                      onChange={(e) =>
                        this.itemUseCase.updateChoice(e, choice.orderIndex)
                      }
                    />
                    <CancelIconButton
                      onClick={() =>
                        this.itemUseCase.removeChoice(choice.orderIndex)
                      }
                    />
                  </Box>
                </Grid>
              )
            )}
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="選択肢追加"
                  icon={<AddCircleIcon />}
                  onClick={() => this.itemUseCase.addChoice()}
                />
                <BottomNavigationAction
                  label="テンプレート選択"
                  icon={<FormatListNumberedIcon />}
                  onClick={() => onTemplateSelectClick()}
                />
              </BottomNavigation>
            </Grid>
          </>
        )}
      </Grid>
    );
  }
}
