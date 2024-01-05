import { Divider,Typography,Box, } from "@mui/material";
import EmptyProfile from "../svgs/EmptyProfile.svg";

export default function SubscriptionsSectionLoggedOut({
  isSideBarOpen,
  theme,
  navigate,
}) {
  return (
    isSideBarOpen && (
      <>
        <Divider />
        <Box sx={{ padding: "16px 32px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: theme.palette.textPrimaryDark,
              width: "176px",
            }}>
            Sign in to like videos, <br /> comment and subscribe.
          </Typography>
          <Box sx={{ mt: "12px" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #ffffff33",
                padding: "8px 15px",
                borderRadius: "40px",
                cursor: "pointer",
                pointerEvents: "all",
                ":hover": {
                  backgroundColor: "#263850",
                },
              }}
              onClick={() => navigate("/login")}>
              <img
                src={EmptyProfile}
                alt="empty-profile"
                style={{ marginRight: "6px", marginLeft: "-6px" }}
              />
              <Typography variant="h6" sx={{ color: "#3ea6ff" }}>
                Sign in
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
}
