import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  count: number;
  page: any;
  onChange: any;
}

export default function PaginationOutlined({ count, page, onChange }: Props) {
  return (
    <Stack
      spacing={2}
      sx={{ alignItems: "center" }}
    >
      <Pagination page={page} count={count} defaultValue={page} variant="outlined" color="primary" onChange={onChange} />
    </Stack>
  );
}
