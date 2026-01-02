import { Fragment } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector(state => state.alert.alerts);

  return (
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <div
            key={alert.id}
            className={`alert alert-${alert.type}`}
          >
            { console.log(alert.type) }
            {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alert;