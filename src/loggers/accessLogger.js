/*istanbul ignore next*/
import accesslog from "morgan";

accesslog.token('log-type', function getName (req) {
  return "access_log"
})

const logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ResponseTime=:response-time log-type=:log-type';

export default accesslog(logFormat, {});
