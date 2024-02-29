import * as MUI from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();

  const goToFarm = (event) => {
    event.preventDefault();
    // check if farmer already exists
    navigate("/farm");
  };

  const [imageData, setImageData] = useState(null);

  const dataString = `Date,NDVI
    2017-03-06,0.40018367767333984
    2017-04-07,0.05679720267653465
    2017-05-09,0.032107215374708176
    2017-06-10,0.43590396642684937
    2017-08-13,0.043585434556007385
    2017-09-14,0.05399482697248459
    2017-10-16,0.05917542427778244
    2017-11-17,0.2927611768245697
    2017-12-19,0.43632665276527405
    2018-01-01,0.1665961891412735
    2018-02-02,0.10973119735717773
    2018-03-06,0.06959526985883713
    2018-04-07,0.3325239419937134
    2018-05-09,0.41216036677360535
    2018-07-12,0.06151184067130089
    2018-09-14,0.07684200257062912
    2018-10-16,0.23589187860488892
    2018-11-17,0.2052292376756668
    2018-12-19,0.3693579435348511
    2019-01-01,0.3666047155857086
    2019-02-02,0.0986219197511673
    2019-03-06,0.09121723473072052
    2019-04-07,0.16389097273349762
    2019-05-09,0.2539637088775635
    2019-06-10,0.10202512890100479
    2019-08-13,0.6076273322105408
    2019-09-14,0.043380819261074066
    2019-10-16,0.6453923583030701
    2019-11-17,0.09900160133838654
    2019-12-19,0.33980700373649597
    2020-01-01,0.33980700373649597
    2020-02-02,0.2485157996416092
  `;

  // Split the data into lines and parse each line
  const chartData = dataString
    .split("\n")
    .slice(1)
    .map((line) => {
      const [date, ndvi] = line.split(",");
      return { date, ndvi: parseFloat(ndvi) };
    });

  const saveChartImage = async () => {
    // Create a new connection to the cluster's API
    const connection = new Connection(clusterApiUrl("devnet"));
    // Initialize a keypair for the user
    const user = Cookies.get("account");

    console.log("PublicKey:", user);

    // metaplex set up
    // const metaplex = Metaplex.make(connection)
    //   .use(keypairIdentity(user))
    //   .use(
    //     bundlrStorage({
    //       address: "https://devnet.bundlr.network",
    //       providerUrl: "https://api.devnet.solana.com",
    //       timeout: 60000,
    //     })
    //   );

    // const chartContainer = document.getElementById("chart-container");
    // html2canvas(chartContainer).then((canvas) => {
    //   const imageData = canvas.toDataURL("image/png");
    //   setImageData(imageData);
    // });
    // try {
    //   // Call the getMerkleTree function to obtain the treeKeypair and treeAuthority
    //   const { treeKeypair, treeAuthority } = await getMerkleTree();
    //   // Now you can use treeKeypair and treeAuthority as needed
    //   console.log("Tree Keypair:", treeKeypair.publicKey.toBase58());
    //   console.log("Tree Authority:", treeAuthority.toBase58());
    //   // Other operations with treeKeypair and treeAuthority
    // } catch (error) {
    //   console.error("Error obtaining the merkle tree:", error);
    // }
  };

  return (
    <MUI.Container
      maxWidth="m"
      sx={{
        display: "flex",
        flexDirection: "column", // Ensure items are stacked vertically
        alignItems: "center", // Center items horizontally
        minHeight: "100vh", // Ensure the container takes up the full height of the viewport
        padding: "20px", // Add padding for spacing
      }}
    >
      <MUI.Button variant="contained" color="primary" onClick={saveChartImage}>
        Testing
      </MUI.Button>
    </MUI.Container>
  );
};

// Define interfaces for NFT data
class NftData {
  constructor(name, symbol, description, sellerFeeBasisPoints, imageFile) {
    this.name = name;
    this.symbol = symbol;
    this.description = description;
    this.sellerFeeBasisPoints = sellerFeeBasisPoints;
    this.imageFile = imageFile;
  }
}

export default Profile;
