export default styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "gray",
    height: "100%",
  },
  cardContainer: {
    width: "80%",
    backgroundColor: "black",
    height: "90%",
  },
  card: {
    resizeMode: "cover",
    height: 700,
  },
  cardImage: {

    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
  },
  buttons: {
    margin: 20,
    zIndex: -100,
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
};
