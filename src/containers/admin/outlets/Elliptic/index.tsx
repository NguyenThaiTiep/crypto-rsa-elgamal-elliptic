import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimerIcon from "@material-ui/icons/Timer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";

import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { TabsRender } from "../../../../components/common/Tab";
import { LabelIcon } from "../../../../components/common/icon";
import EllipticBuild from "../../../../components/Elliptic";

interface Props {}
const apartmentTab = [
  {
    label: <LabelIcon label="Xây dựng hệ mật" icon={<CheckCircleIcon />} />,

    icon: CheckCircleIcon,
    component: <EllipticBuild />,
  },
];
export const Elliptic = (props: Props) => {
  return (
    <>
      <TabsRender input={apartmentTab} />
    </>
  );
};

export default Elliptic;
