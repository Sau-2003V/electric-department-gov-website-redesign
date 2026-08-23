import ContactCard from "./ContactCard";
import { CONTACT_CHANNELS } from "./constants";

export default function ContactGrid() {
  return (
    <section aria-labelledby="emergency-contacts-heading">
      <h2 id="emergency-contacts-heading" className="sr-only">
        Emergency & Support Contact Channels
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => (
          <ContactCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
