import { Film, Mail, Phone } from "lucide-react";

const socialLinks = ["Facebook", "Instagram", "Twitter", "Youtube"];

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-9 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#4338CA]">
              <Film className="size-5" />
            </span>
            <p className="text-lg font-bold leading-6">Movie Z</p>
          </div>
          <p className="mt-4 text-sm font-normal leading-6 text-zinc-300">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="grid flex-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:max-w-2xl lg:border-t-0 lg:pt-0">
          <div className="space-y-4">
            <p className="text-sm font-semibold leading-5">
              Contact Information
            </p>
            <div className="flex items-center gap-3 text-sm leading-5 text-zinc-300">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#4338CA] text-white">
                <Mail className="size-4" />
              </span>
              <div>
                <p className="font-medium text-white">Email</p>
                <a
                  href="mailto:support@movieZ.com"
                  className="text-zinc-300 transition hover:text-white"
                >
                  support@movieZ.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm leading-5 text-zinc-300">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#4338CA] text-white">
                <Phone className="size-4" />
              </span>
              <div>
                <p className="font-medium text-white">Phone</p>
                <a
                  href="tel:+976111234567"
                  className="text-zinc-300 transition hover:text-white"
                >
                  +976 (11) 123-4567
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold leading-5">Follow us</p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((socialLink) => (
                <a
                  href="/"
                  key={socialLink}
                  className="rounded-[8px] border border-[#4338CA] px-3 py-2 text-sm font-medium leading-5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                  {socialLink}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
