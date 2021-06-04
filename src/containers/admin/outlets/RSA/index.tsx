import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimerIcon from "@material-ui/icons/Timer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";

import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { TabsRender } from "../../../../components/common/Tab";
import { LabelIcon } from "../../../../components/common/icon";
import BuildCriptoRSA from "../../../../components/RSA/buildCrypto";

import SignRSA from "../../../../components/RSA/signRSA";
import CheckSignRSA from "../../../../components/RSA/checkSignRSA";

interface Props {}
const apartmentTab = [
  {
    label: <LabelIcon label="Xây dựng hệ mật" icon={<CheckCircleIcon />} />,
    icon: CheckCircleIcon,
    component: <BuildCriptoRSA />,
  },
  {
    label: <LabelIcon label="Ký" icon={<FavoriteIcon />} />,

    icon: FavoriteIcon,
    component: <SignRSA />,
  },
  {
    label: <LabelIcon label="Kiểm tra chữ ký" icon={<FavoriteIcon />} />,
    icon: FavoriteIcon,
    component: <CheckSignRSA />,
  },
];
export const RSA = (props: Props) => {
  return (
    <>
      <TabsRender input={apartmentTab} />
    </>
  );
};

export default RSA;
