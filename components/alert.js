import Container from "./container";
import { IoMail, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

export default function Alert() {
  return (
    <div className="border-b bg-accent-1 border-accent-2">
      <Container>
        <div className="flex justify-end py-0.5">
          <a
            className="mr-1"
            href="https://linkedin.com/in/jmalvarezvano"
            title="linkedin.com/in/jmalvarezvano"
            target="_blank"
          >
            <IoLogoLinkedin size="2em" />
          </a>
          <a
            className="mr-1"
            href="https://twitter.com/jmalvarez_dev"
            title="@jmalvarez_dev"
            target="_blank"
          >
            <IoLogoTwitter size="2em" />
          </a>
          <a
            href="mailto:jm.alvarez.vano@gmail.com"
            title="jm.alvarez.vano@gmail.com"
          >
            <IoMail size="2em" />
          </a>
        </div>
      </Container>
    </div>
  );
}
