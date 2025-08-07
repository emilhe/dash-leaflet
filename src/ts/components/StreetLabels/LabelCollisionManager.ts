// src/components/StreetLabels/LabelCollisionManager.ts
import RBush from 'rbush';

interface LabelItem {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  id: string;
}

export class LabelCollisionManager {
  private tree: RBush<LabelItem>;
  private labels: Map<string, LabelItem>;

  constructor() {
    this.tree = new RBush();
    this.labels = new Map();
  }

  reset(): void {
    this.tree.clear();
    this.labels.clear();
  }

  checkAndAdd(id: string, bounds: L.Bounds): boolean {
    const item: LabelItem = {
      minX: bounds.min.x,
      minY: bounds.min.y,
      maxX: bounds.max.x,
      maxY: bounds.max.y,
      id
    };

    // Check for collisions
    const collisions = this.tree.search(item);

    if (collisions.length === 0) {
      // No collision, add to spatial index
      this.tree.insert(item);
      this.labels.set(id, item);
      return true;
    }

    return false;
  }

  remove(id: string): void {
    const item = this.labels.get(id);
    if (item) {
      this.tree.remove(item);
      this.labels.delete(id);
    }
  }
}