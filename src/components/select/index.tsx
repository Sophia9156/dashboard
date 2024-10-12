import styled from "styled-components";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  minWidth: string;
  country: CountryUnion;
  onChange: (e: SelectChangeEvent<CountryUnion>) => void;
}

const CountrySelect: React.FC<Props> = ({ minWidth, country, onChange }) => {
  return (
    <StyledSelect>
      <Box sx={{ minWidth }}>
        <FormControl fullWidth>
          <Select
            labelId="country"
            id="country"
            value={country}
            onChange={onChange}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="Korea">Korea</MenuItem>
            <MenuItem value="US">US</MenuItem>
            <MenuItem value="China">China</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledSelect>
  );
};

export default CountrySelect;

const StyledSelect = styled.div`
  position: absolute;
  top: 28px;
  right: 40px;
  .MuiSelect-select {
    padding: 16px 20px;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.4px;
    color: #777;
    background-color: #fff;
    filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.04));
  }
  .MuiOutlinedInput-notchedOutline {
    border-radius: 8px;
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    .MuiSelect-select {
      padding: 14px 18px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1440px) {
    position: absolute;
    top: 28px;
    right: 40px;
    .MuiSelect-select {
      padding: 16px 20px;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.4px;
      color: #777;
      filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.04));
    }
    .MuiOutlinedInput-notchedOutline {
      border-radius: 8px;
    }
  }
`;
