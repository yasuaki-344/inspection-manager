import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { EquipmentForm } from "../components";
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

  readonly item: InspectionItem;

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

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
    this.selectionSheets = sheetUseCase.sheets;
    this.item = itemUseCase.inspectionItem;
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
    this.itemUseCase = itemUseCase;
  }

  /** @inheritdoc */
  sheetIdInformation(isEdit: boolean): JSX.Element {
    return isEdit ? (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          disabled
          label="点検シートID"
          variant="outlined"
          size="small"
          name="sheetId"
          defaultValue={this.sheetUseCase.sheet.sheetId}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    ) : (
      <></>
    );
  }

  /** @inheritdoc */
  sheetNameInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          required
          autoFocus
          label="点検シート名"
          variant="outlined"
          size="small"
          name="sheetName"
          value={this.sheetUseCase.sheet.sheetName}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </Grid>
    );
  }

  /** @inheritdoc */
  groupIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          select
          label="点検グループ"
          variant="outlined"
          size="small"
          name="inspectionGroupId"
          value={this.sheetUseCase.sheet.inspectionGroupId}
          onChange={handleChange}
        >
          {this.groupUseCase.groups.map((group: InspectionGroup) => (
            <MenuItem
              key={group.inspectionGroupId}
              value={group.inspectionGroupId}
            >
              {group.description}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  }

  /** @inheritdoc */
  typeIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element {
    return (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          select
          label="点検タイプ"
          variant="outlined"
          size="small"
          name="inspectionTypeId"
          value={this.sheetUseCase.sheet.inspectionTypeId}
          onChange={handleChange}
        >
          {this.typeUseCase.types.map((type: InspectionType) => (
            <MenuItem key={type.inspectionTypeId} value={type.inspectionTypeId}>
              {type.description}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  }

  /** @inheritdoc */
  getEditContent(): JSX.Element {
    return (
      <>
        {this.sheetUseCase.sheet.equipments.map((equipment: Equipment) => (
          <Grid item xs={12} key={equipment.orderIndex}>
            <EquipmentForm
              orderIndex={equipment.orderIndex}
              equipment={equipment}
            />
          </Grid>
        ))}
      </>
    );
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
