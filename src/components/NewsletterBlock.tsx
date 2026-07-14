import siteConfig from '~/site.config';
import { SignupForm } from './SignupForm';
import { Kicker } from './ui';

/** The signup block used at the foot of every major page. */
export function NewsletterBlock({
  id = 'subscribe',
  source,
  heading,
  sub,
}: {
  id?: string;
  source: string;
  heading?: string;
  sub?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-moss-deep py-section text-paper">
      <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Kicker tone="paper">{siteConfig.cadenceShort} · Free</Kicker>
          <h2 id={`${id}-heading`} className="mt-4 text-display-md text-paper">
            {heading ?? siteConfig.newsletter.heading}
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="max-w-prose text-body-lg leading-relaxed text-paper/75">
            {sub ?? siteConfig.newsletter.sub}
          </p>
          <div className="mt-8">
            <SignupForm source={source} onDark />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBlock;
