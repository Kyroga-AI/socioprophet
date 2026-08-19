import './_group.css';
import './archive-copper.css';

import { Current } from './Current';

/**
 * Archive / Copper is intentionally composed from the extracted baseline.
 * The wrapper keeps the information architecture, imagery, type, spacing and
 * interactions identical while giving the palette its own visual hypothesis.
 */
export function ArchiveCopper() {
  return (
    <div className="archive-copper">
      <Current />
    </div>
  );
}