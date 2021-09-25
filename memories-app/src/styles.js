import { makeStyles } from "@material-ui/core/styles";
// This is how we are going to make our own styles using material UI
export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
}));

// this callback function returns an object i.e the makestyles that is being exported
