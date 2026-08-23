import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export default function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="August 9, 2026">
      <LegalSection title="1. Introduction">
        <p>
          CareerShift ("we," "our," or "us") provides career intelligence and AI fitness assessment
          services for professionals and organizations. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our website, applications, and
          related services (collectively, the "Services").
        </p>
        <p>
          By accessing or using CareerShift, you agree to the collection and use of information in
          accordance with this policy. If you do not agree, please do not use the Services.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>
          <strong className="text-foreground">Account information.</strong> When you register, we
          collect your name, email address, and authentication credentials.
        </p>
        <p>
          <strong className="text-foreground">Career and assessment data.</strong> To generate your
          AI Career Readiness Report, we collect professional background, role details, skills,
          work tasks, and responses you provide during assessments and onboarding.
        </p>
        <p>
          <strong className="text-foreground">Usage data.</strong> We automatically collect technical
          information such as IP address, browser type, device identifiers, pages visited, and
          interaction timestamps to maintain security and improve product performance.
        </p>
        <p>
          <strong className="text-foreground">Communications.</strong> If you contact us, we retain
          the content of your messages and related contact details to respond and improve support.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>We use collected information to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide, personalize, and deliver assessment reports and recommendations</li>
          <li>Operate, maintain, and secure the Services</li>
          <li>Process transactions and manage subscriptions</li>
          <li>Communicate product updates, support responses, and service notices</li>
          <li>Analyze aggregated usage trends to improve features and reliability</li>
          <li>Comply with legal obligations and enforce our Terms of Service</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. AI Processing">
        <p>
          CareerShift uses automated and AI-assisted systems to analyze assessment inputs and
          generate career insights. Your data may be processed by third-party AI infrastructure
          providers under contractual safeguards. We do not use your personal assessment content to
          train public-facing models without your explicit consent.
        </p>
      </LegalSection>

      <LegalSection title="5. Sharing and Disclosure">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Service providers that host infrastructure, analytics, email delivery, and payments</li>
          <li>Enterprise administrators when your account is provisioned under an organization plan</li>
          <li>Legal authorities when required by applicable law or to protect rights and safety</li>
          <li>Successors in connection with a merger, acquisition, or asset transfer</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          We retain personal data for as long as your account is active or as needed to provide the
          Services, comply with legal obligations, resolve disputes, and enforce agreements. You may
          request deletion of your account data subject to applicable retention requirements.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We implement administrative, technical, and organizational measures designed to protect
          your information, including encryption in transit, access controls, and monitoring.
          However, no method of transmission or storage is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="8. Your Rights">
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, delete, restrict,
          or port your personal data, and to object to certain processing. To exercise these rights,
          contact us at{" "}
          <a href="mailto:privacy@careershift.com" className="text-brand underline-offset-2 hover:underline">
            privacy@careershift.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. International Transfers">
        <p>
          Your information may be processed in countries other than your own. Where required, we use
          appropriate safeguards for cross-border data transfers.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be posted on
          this page with an updated effective date. Continued use of the Services after changes
          constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          For privacy-related questions, contact{" "}
          <a href="mailto:privacy@careershift.com" className="text-brand underline-offset-2 hover:underline">
            privacy@careershift.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
