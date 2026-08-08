import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export default function Terms() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="August 9, 2026">
      <LegalSection title="1. Agreement">
        <p>
          These Terms of Service ("Terms") govern your access to and use of CareerShift websites,
          applications, assessments, reports, workshops, and related services ("Services") operated
          by CareerShift. By creating an account or using the Services, you agree to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          You must be at least 18 years old and capable of entering a binding contract to use
          CareerShift. If you use the Services on behalf of an organization, you represent that you
          have authority to bind that organization to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="3. Accounts and Security">
        <p>
          You are responsible for maintaining the confidentiality of your login credentials and for
          all activity under your account. Notify us promptly of any unauthorized access or security
          incident.
        </p>
      </LegalSection>

      <LegalSection title="4. Services and Reports">
        <p>
          CareerShift provides career intelligence tools, including AI-assisted assessments and
          readiness reports. Outputs are informational and educational. They do not constitute legal,
          financial, HR, or employment advice. You are responsible for decisions made based on report
          content.
        </p>
        <p>
          We may modify, suspend, or discontinue features to improve the Services, with reasonable
          notice where practicable.
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Use the Services for unlawful, fraudulent, or harmful purposes</li>
          <li>Attempt to reverse engineer, scrape, or disrupt platform operations</li>
          <li>Upload malicious code or infringe intellectual property or privacy rights</li>
          <li>Misrepresent identity or submit false assessment information</li>
          <li>Resell or redistribute report outputs without authorization</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Subscriptions and Payments">
        <p>
          Paid plans, one-time purchases, and enterprise agreements are billed according to the
          pricing presented at checkout or in an order form. Fees are non-refundable except where
          required by law or explicitly stated in writing. Failure to pay may result in suspension of
          paid features.
        </p>
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <p>
          CareerShift and its licensors retain all rights in the platform, branding, software, and
          proprietary methodologies. You retain ownership of content you submit. You grant CareerShift
          a limited license to process your content solely to operate and improve the Services.
        </p>
      </LegalSection>

      <LegalSection title="8. Confidentiality (Enterprise)">
        <p>
          For enterprise customers, confidentiality terms may be defined in a separate agreement or
          order form. In the absence of such terms, each party will protect the other&apos;s
          non-public business information with reasonable care.
        </p>
      </LegalSection>

      <LegalSection title="9. Disclaimers">
        <p>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY
          LAW, CAREERSHIFT DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE UNINTERRUPTED
          OR ERROR-FREE OPERATION OR SPECIFIC CAREER OUTCOMES.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAREERSHIFT AND ITS AFFILIATES WILL NOT BE LIABLE
          FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
          PROFITS, DATA, OR GOODWILL. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THE SERVICES
          WILL NOT EXCEED THE AMOUNT YOU PAID TO CAREERSHIFT IN THE TWELVE (12) MONTHS BEFORE THE
          EVENT GIVING RISE TO THE CLAIM.
        </p>
      </LegalSection>

      <LegalSection title="11. Termination">
        <p>
          You may stop using the Services at any time. We may suspend or terminate access for
          violations of these Terms, security risks, or legal requirements. Provisions that by nature
          should survive termination will remain in effect.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing Law">
        <p>
          These Terms are governed by the laws of the jurisdiction in which CareerShift is
          incorporated, without regard to conflict-of-law principles. Disputes will be resolved in
          the courts of that jurisdiction unless otherwise required by applicable consumer protection
          law.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes">
        <p>
          We may update these Terms periodically. Updated Terms will be posted on this page with a
          revised effective date. Material changes may also be communicated by email or in-product
          notice. Continued use after updates constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Questions about these Terms may be sent to{" "}
          <a href="mailto:legal@careershift.com" className="text-brand underline-offset-2 hover:underline">
            legal@careershift.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
