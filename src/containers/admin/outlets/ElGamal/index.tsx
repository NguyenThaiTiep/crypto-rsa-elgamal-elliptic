import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimerIcon from "@material-ui/icons/Timer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";

import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { TabsRender } from "../../../../components/common/Tab";
import { LabelIcon } from "../../../../components/common/icon";
import BuildCriptoElGamal from "../../../../components/ElGamal/buildCrypto";
import CriptoElGamal from "../../../../components/ElGamal/crypto";
import SignElGamal from "../../../../components/ElGamal/sign";
import CheckSignElGamal from "../../../../components/ElGamal/checkSign";

interface Props {}
const apartmentTab = [
  {
    label: <LabelIcon label="Xây dựng hệ mật" icon={<CheckCircleIcon />} />,

    icon: CheckCircleIcon,
    component: <BuildCriptoElGamal />,
  },
  {
    label: <LabelIcon label="Mã hóa Elgmal" icon={<TimerIcon />} />,

    icon: TimerIcon,
    component: <CriptoElGamal />,
  },
  {
    label: <LabelIcon label="Ký văn bản" icon={<FavoriteIcon />} />,

    icon: FavoriteIcon,
    component: <SignElGamal />,
  },
  {
    label: <LabelIcon label="Kiểm tra chữ ký" icon={<FavoriteIcon />} />,
    icon: FavoriteIcon,
    component: <CheckSignElGamal />,
  },
];
export const ElGamal = (props: Props) => {
  return (
    <>
      <TabsRender input={apartmentTab} />
    </>
  );
};

export default ElGamal;
