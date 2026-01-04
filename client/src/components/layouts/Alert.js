import { Fragment } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector(state => state.alert);

  return (
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <div
            key={alert.id}
            className={`alert alert-${alert.alertType}`}
          >
            {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alert;