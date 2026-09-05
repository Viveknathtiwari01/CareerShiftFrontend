import { Link } from "react-router-dom";
import { Clock, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";

export function Footer() {
  const links = [
    { label: "About", to: "/about" },
    { label: "Founder", to: "#" },
    { label: "Contact", to: "#contact" },
    { label: "FAQ", to: "#faq" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Refund Policy", to: "#" },
    { label: "Cookie Policy", to: "#" },
  ];

  const socials = [
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/company/careershift3b/",
      label: "CareerShift on LinkedIn",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/careershift3b/",
      label: "CareerShift on Instagram",
    },
  ];

  return (
    <footer className="w-full">
      {/* Top Section - Dark Blue */}
      <div className="bg-[#11213D] py-16 text-white overflow-hidden">
        <div className="container-page mx-auto">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-center">
            {/* Left - Headline */}
            <div className="max-w-md">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-4xl leading-tight">
                Your next chapter<br/>starts with <span className="text-[#FDCF58]">clarity.</span>
              </h2>
              <p className="mt-4 text-[15px] text-white/80">
                Get your Career Intelligence Report today.
              </p>
            </div>

            {/* Middle - CTA */}
            <div className="flex flex-col items-center justify-center gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-[#FDCF58] px-8 py-3.5 text-sm font-bold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
              >
                Get My Report <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-1.5 text-[13px] text-white/70">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>One-time report · Takes about 20 minutes</span>
              </div>
            </div>

            {/* Right - Handwritten accent */}
            <div className="flex items-center justify-start lg:justify-end">
              <div className="w-[200px] -rotate-2">
                <p
                  className="text-[32px] leading-tight text-white"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                >
                  Same you.
                  <br />
                  A broader
                  <br />
                  tomorrow.
                </p>
                <div className="mt-2 h-1.5 w-24 bg-[#FDCF58] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - White */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="container-page mx-auto">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-start gap-3">
              <Link to="/">
                <img
                  src="/new_logo11.png"
                  alt="CareerShift Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Links */}
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] font-medium text-[#11213D] hover:text-[#FDCF58] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials & Copyright */}
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#11213D] hover:text-[#FDCF58] transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-gray-500">
                © {new Date().getFullYear()} CareerShift.<br/>All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
