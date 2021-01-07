import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import { styled } from "@material-ui/core/styles";

import { Router } from "../Icons";
import "./Spinner.scss";

export interface IProps {
  size?: "small" | "medium" | "large" | "huge";
  icon?: React.ReactNode;
}

const SpinnerIconOuter = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fill: theme.palette.primary.contrastText
}));

const Pulse = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}));

function Spinner({ size = "medium", icon }: IProps) {
  const className = classNames(
    {
      "ui-128__spinner--small": size === "small",
      "ui-128__spinner--large": size === "large",
      "ui-128__spinner--huge": size === "huge"
    },
    "ui-128__spinner",
    "ui-128"
  );

  if (!icon) {
    icon = <Router className="ui-128__spinner-icon" />;
  }

  return (
    <div className={className}>
      <Pulse className="ui-128__spinner-pulse-outer" />
      <Pulse className="ui-128__spinner-pulse-inner" />
      <SpinnerIconOuter className="ui-128__spinner-icon-outer">
        {icon}
      </SpinnerIconOuter>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large", "huge"])
};

Spinner.defaultProps = {
  size: "medium"
};

export default Spinner;
