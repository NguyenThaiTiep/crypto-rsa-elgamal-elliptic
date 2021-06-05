import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
}));
interface Props {
  data?: { x: any; y: any }[];
  onChange?: (value: any) => void;
  placeHolder?: string;
  label?: string;
  value?: any;
}
export const SelectInput = (props: Props) => {
  const classes = useStyles();
  const { data, onChange, placeHolder, label, value } = props;
  //   const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any) => {
    let text = (event.target.value as string).split("|");

    onChange && onChange({ x: text[0], y: text[1] });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const getLabel = (item: { x: any; y: any }) => `(${item.x},${item.y})`;
  const getValue = (item: { x: any; y: any }) => `${item.x}|${item.y}`;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value ? getValue(value) : ""}
          onChange={handleChange}
        >
          {data?.map((item) => (
            <MenuItem value={getValue(item)}>{getLabel(item)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
