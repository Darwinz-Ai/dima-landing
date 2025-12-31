import icon360 from "@/public/enterprise-icons/360.png";
import arabicIcon from "@/public/enterprise-icons/arabic.png";
import crisisIcon from "@/public/enterprise-icons/crisis.png";
import reportsIcon from "@/public/enterprise-icons/report.png";
import dimaIcon from "@/public/enterprise-icons/dima.png";
import usersIcon from "@/public/enterprise-icons/users.png";
import eyeIcon from "@/public/enterprise-icons/visual.png";
import hourglassIcon from "@/public/enterprise-icons/hourglass.png";
import searchIcon from "@/public/enterprise-icons/search.png";
import benchmarkingIcon from "@/public/enterprise-icons/balance.png";
import coverageIcon from "@/public/enterprise-icons/coverage.png";
import speedOMeterIcon from "@/public/enterprise-icons/speedometer.png";
import influencerIcon from "@/public/enterprise-icons/influencer.png";
import { StaticImageData } from "next/image";

export const enterpriseIcons: Record<string, StaticImageData> = {
  "360": icon360,
  arabic: arabicIcon,
  crisis: crisisIcon,
  reports: reportsIcon,
  dima: dimaIcon,
  users: usersIcon,
  eye: eyeIcon,
  hourglass: hourglassIcon,
  search: searchIcon,
  benchmarking: benchmarkingIcon,
  coverage: coverageIcon,
  speedOMeter: speedOMeterIcon,
  influencer: influencerIcon,
};
