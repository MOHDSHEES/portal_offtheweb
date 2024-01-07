import jsPDF from "jspdf";
import SideNavItem from "../layout/side-nav-item";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { useContext, useState } from "react";
import { MyContext } from "../context";
import { closeMessage, openMessage } from "./message";

function GenerateCertificate() {
  const { user, messageApi } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  function createCertificate() {
    setLoading(true);
    openMessage(messageApi, "Downloading...");
    const doc = new jsPDF({
      format: [424.2, 601],
      unit: "px",
    });
    handleGeneratePdf(doc, user);
    closeMessage(messageApi, "Download Complete.");
    setLoading(false);
  }
  return (
    <SideNavItem
      onClick={() => createCertificate()}
      active={loading}
      disabled={false}
      external={false}
      icon={<CardMembershipIcon sx={{ fontSize: 18 }} />}
      path=""
      title="Certificate of Completion"
    />
  );
}
const handleGeneratePdf = (doc, data) => {
  const currentDate = new Date(data.certificate.issueDate);
  currentDate.setMonth(currentDate.getMonth() - 3);

  // Format the result as YYYY-MM-DD
  const startingDate = currentDate.toISOString().slice(0, 10);

  doc.addFont("/fonts/Charm-Bold.ttf", "Charm-Bold", "normal");
  doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto-Bold", "normal");

  const imgData = "/certificate.webp";
  doc.addImage(
    imgData,
    "PNG",
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight()
  );

  doc.setFont("Charm-Bold", "normal");
  doc.setFontSize(40); // Set the font size to 16
  doc.setTextColor(94, 27, 34);
  doc.text(data.name, doc.internal.pageSize.getWidth() / 2, 300, {
    align: "center",
  });

  // heading
  doc.setFont("Roboto-Bold", "normal");
  doc.setTextColor(94, 27, 34);

  doc.setFontSize(47);
  doc.text("CERTIFICATE", doc.internal.pageSize.getWidth() / 2, 80, {
    align: "center",
  });
  doc.setFontSize(20);
  doc.text("OF COMPLETION", doc.internal.pageSize.getWidth() / 2, 110, {
    align: "center",
  });
  doc.text("PROUDLY PRESENTED TO", doc.internal.pageSize.getWidth() / 2, 250, {
    align: "center",
  });

  // founder
  const areaWidth = 133; // Width of the area
  const areaHeight = 100; // Height of the area
  let areaX = 70; // X-coordinate of the area's top-left corner
  let areaY = 435;
  let centerX = areaX + areaWidth / 2;
  doc.setFont("Inter-Regular", "normal");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text("Founder", centerX, areaY + areaHeight / 2, { align: "center" });

  // reg no.
  doc.setFontSize(8);
  doc.text("Reg.No: UDYAM-UP-17-0017152", 300, 14);
  doc.text(`Certificate.No: ${data.certificate.certificateNo}`, 300, 22);
  doc.setFontSize(9);
  doc.text(
    `To verify the certificate, visit  " https://www.offtheweb.in/verify/${data.certificate.certificateNo} " .`,
    30,
    590
  );

  const imageUrl = "/sign.png";
  const imgWidth = 120;
  const imgHeight = 70;

  // founder name
  doc.setFont("Roboto-Bold", "normal");
  doc.setTextColor(94, 27, 34);
  areaY = 413;
  areaX = 66;
  doc.addImage(imageUrl, "JPEG", areaX, 428, imgWidth, imgHeight);
  doc.setFontSize(17);

  // project-manager name
  areaY = 413;
  areaX = 229;
  centerX = areaX + areaWidth / 2;
  let imgUrl;
  if (
    data.certificate.guidence &&
    data.certificate.guidence === "Deepak Kumar"
  ) {
    imgUrl = "/deepakSign.png";
  } else {
    imgUrl = "/anasSign.png";
  }

  doc.addImage(imgUrl, "JPEG", areaX, 428, imgWidth, imgHeight);

  // project-manager
  areaY = 435;
  doc.setFont("Inter-Regular", "normal");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text("Manager", centerX, areaY + areaHeight / 2, {
    align: "center",
  });

  // date
  doc.setFontSize(13);
  doc.text("Date", doc.internal.pageSize.getWidth() / 2, 550, {
    align: "center",
  });

  // Date value
  doc.setFontSize(17);
  doc.setTextColor(94, 27, 34);
  doc.setFont("Roboto-Bold", "normal");
  doc.text(
    `${data.certificate.issueDate}`,
    doc.internal.pageSize.getWidth() / 2,
    530,
    {
      align: "center",
    }
  );

  doc.setFontSize(15);
  doc.setTextColor(146, 45, 55);
  doc.setFont("Roboto-Bold", "normal");

  doc.text(
    `We are happy to certify that ${data.name} has`,
    doc.internal.pageSize.getWidth() / 2,
    330,
    {
      align: "center",
    }
  );
  doc.text(
    `completed a three months internship with OFFTHEWEB as a`,
    doc.internal.pageSize.getWidth() / 2,
    350,
    {
      align: "center",
    }
  );
  doc.text(
    ` ${data.post} from ${startingDate} to ${data.certificate.issueDate}.`,
    doc.internal.pageSize.getWidth() / 2,
    370,
    {
      align: "center",
    }
  );
  doc.text(
    `We appreciate ${
      data.gender === "male" ? "his" : "her"
    } work and contribution.`,
    doc.internal.pageSize.getWidth() / 2,
    390,
    {
      align: "center",
    }
  );

  doc.text(
    "This certificate is awarded by:",
    doc.internal.pageSize.getWidth() / 2,
    420,
    {
      align: "center",
    }
  );

  // pdf download
  doc.save("certificate.pdf");
};

export default GenerateCertificate;
