import './_group.css';
import './archive-silver.css';

import { Current } from './Current';

/**
 * Archive / Silver keeps the archival homepage's composition, language,
 * imagery, and interaction model intact while replacing the warm registrar's
 * copper signal with a cool silver-grey signal.
 */
export function ArchiveSilver() {
  return (
    <div className="archive-silver">
      <Current />
    </div>
  );
}