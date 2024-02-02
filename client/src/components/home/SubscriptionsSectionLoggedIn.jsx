/* eslint-disable array-callback-return */
import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { useGetSubsriptionQuery } from "../../state/api";
import { useState } from "react";

const showLessSubscriptions = (setElementsToAdd, showMoreSubscriptionRef) => {
  setElementsToAdd([]);
  showMoreSubscriptionRef.current.style.display = "flex";
};
const addMoreSubscriptions = (
  data,
  theme,
  isSideBarOpen,
  elementsToAdd,
  setElementsToAdd,
  showMoreSubscriptionRef
) => {
  const showLessSubscriptionsFn = () => {
    showLessSubscriptions(setElementsToAdd, showMoreSubscriptionRef);
  };
  const newElements = data.channels.map((channel, idx, array) => {
    if (idx >= 8) {
      return (
        <ListItem
          key={Math.random() * 1000 - Math.random() * 10}
          sx={{
            padding: "0px 12px",
            borderRadius: "10px",
            "& .MuiListItemButton-root:hover": {
              backgroundColor: theme.palette.darkGrayHome,
            },
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          disablePadding>
          <ListItemButton
            key={`${channel.name}-${idx}-listitembtn`}
            sx={{
              backgroundColor: theme.palette.bgHomeDark,
              color: theme.palette.textPrimaryDark,
              padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
              borderRadius: "10px",
            }}>
            <ListItemIcon
              key={`${channel.name}-${idx}`}
              sx={{
                color: "white",
                borderRadius: "50%",
              }}>
              <img
                src={channel?.imgUrl}
                width="24px"
                alt={channel?.imgUrl}
                style={{
                  borderRadius: "50%",
                }}
              />
            </ListItemIcon>
            <ListItemText
              key={`${channel.name}-${idx}-listitemtext`}
              primary={
                channel.name.length <= 18
                  ? channel.name
                  : channel.name.substring(0, 17).concat("...")
              }
            />
          </ListItemButton>
        </ListItem>
      );
    }
  });
  const showLessElement = (
    <>
      <ListItem
        key={`ShowLessElement`}
        className="ShowLessElement"
        sx={{
          padding: "0px 12px",
          borderRadius: "10px",
          "& .MuiListItemButton-root:hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
          "& .MuiTypography-root": {
            fontSize: "14px",
          },
        }}
        onClick={showLessSubscriptionsFn}
        disablePadding>
        <ListItemButton
          sx={{
            backgroundColor: theme.palette.bgHomeDark,
            color: theme.palette.textPrimaryDark,
            padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
            borderRadius: "10px",
          }}>
          <ListItemIcon
            sx={{
              color: "white",
              borderRadius: "50%",
            }}>
            <ExpandLessOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Show less`} />
        </ListItemButton>
      </ListItem>
    </>
  );

  showMoreSubscriptionRef.current.style.display = "none";
  // console.log(showMoreSubscriptionRef.current);

  // Set the state variable to null so that the element is not added again
  setElementsToAdd([...elementsToAdd, ...newElements, showLessElement]);
};

export default function SubscriptionsSectionLoggedIn({
  isSideBarOpen,
  theme,
  showMoreSubscriptionRef,
}) {
  const [elementsToAdd, setElementsToAdd] = useState([]);
  const { data, isLoading } = useGetSubsriptionQuery();
  const addMoreSubscriptionsCallFn = () => {
    addMoreSubscriptions(
      data,
      theme,
      isSideBarOpen,
      elementsToAdd,
      setElementsToAdd,
      showMoreSubscriptionRef
    );
  };

  return (
    isSideBarOpen && (
      <>
        <Divider />
        <Typography
          variant="h5"
          component="div"
          sx={{
            padding: "18px 108px 4px 20px",
            color: theme.palette.textPrimaryDark,
          }}>
          Subscriptions
        </Typography>

        {!data || isLoading ? (
          <Typography
            sx={{
              padding: "18px 108px 4px 20px",
              color: theme.palette.textPrimaryDark,
            }}>
            Loading...
          </Typography>
        ) : (
          <List
            sx={{
              paddingTop: "0px",
              paddingBottom: "10px",
            }}>
            {data.channels.map((channel, idx, array) => {
              if (idx <= 7) {
                return (
                  <ListItem
                    key={idx * Math.random()}
                    sx={{
                      padding: "0px 12px",
                      borderRadius: "10px",
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: theme.palette.darkGrayHome,
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor: theme.palette.bgHomeDark,
                        color: theme.palette.textPrimaryDark,
                        padding: isSideBarOpen
                          ? "8px 12px"
                          : " 12px 10px 12px 16px",
                        borderRadius: "10px",
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                          borderRadius: "50%",
                        }}>
                        <img
                          src={channel?.imgUrl}
                          width="24px"
                          alt={channel?.imgUrl}
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          channel.name.length <= 18
                            ? channel.name
                            : channel.name.substring(0, 17).concat("...")
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
            <ListItem
              ref={showMoreSubscriptionRef}
              key={`Show ${data.channels.length - 7} more`}
              className="showMoreSubscription"
              sx={{
                paddingX: "12px",
                "& .MuiListItemButton-root:hover": {
                  backgroundColor: theme.palette.darkGrayHome,
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              onClick={addMoreSubscriptionsCallFn}
              disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.bgHomeDark,
                  color: theme.palette.textPrimaryDark,
                  padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                  borderRadius: "10px",
                }}>
                <ListItemIcon>{<ExpandMoreOutlinedIcon />}</ListItemIcon>
                <ListItemText
                  primary={`Show ${data.channels.length - 7} more`}
                />
              </ListItemButton>
            </ListItem>
            {elementsToAdd}
          </List>
        )}
      </>
    )
  );
}
