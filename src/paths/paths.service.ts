import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StationsService } from '../stations/stations.service';
import { Path } from './entities/path.entity';

@Injectable()
export class PathsService {
  private readonly logger = new Logger('prueba de la ruta');
  private paths: Path[] = [];

  constructor(private readonly stationsService: StationsService) {}

  create(path: Path) {
    this.paths.push(path);
  }

  findAll(): Path[] {
    return this.paths;
  }
  findOne(id: number): Path {
    const path = this.paths.find((path) => path.id === id);
    if (!path) {
      throw new NotFoundException(`Path with ID ${id} not found`);
    }
    return path;
  }
  findOptimalPath(
    sourceId: number,
    destinationId: number,
  ): { path: number[]; cost: number } {
    if (sourceId === destinationId) {
      return { path: [sourceId], cost: 0 };
    }

    const distances = new Map<number, number>();
    const previousNodes = new Map<number, number>();
    const stations = this.stationsService.findAll();

    if (stations.length === 0) {
      return { path: [], cost: null };
    }

    const unvisited = new Set<number>(stations.map((station) => station.id));

    distances.set(sourceId, 0);

    while (unvisited.size > 0) {
      const current = this.getClosestNode(distances, unvisited);
      if (current === undefined) {
        break;
      }

      unvisited.delete(current);

      if (current === destinationId) break;

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        const neighborId =
          neighbor.sourceId === current
            ? neighbor.destinationId
            : neighbor.sourceId;
        if (!unvisited.has(neighborId)) continue;

        const currentDist = distances.get(current) || 0;
        const newDist = currentDist + neighbor.cost;
        if (newDist < (distances.get(neighborId) || Infinity)) {
          distances.set(neighborId, newDist);
          previousNodes.set(neighborId, current);
        }
      }
    }

    const path = [];
    let currentNode = destinationId;
    while (previousNodes.has(currentNode)) {
      path.unshift(currentNode);
      currentNode = previousNodes.get(currentNode);
    }
    if (path.length > 0 && path[0] !== sourceId) {
      path.unshift(sourceId);
    }

    return { path, cost: distances.get(destinationId) || null };
  }

  private getClosestNode(
    distances: Map<number, number>,
    unvisited: Set<number>,
  ): number | undefined {
    let minDist = Infinity;
    let closestNode: number | undefined = undefined;
    for (const node of unvisited) {
      const dist = distances.get(node);
      if (dist !== undefined && dist < minDist) {
        minDist = dist;
        closestNode = node;
      }
    }
    return closestNode;
  }

  private getNeighbors(nodeId: number): Path[] {
    const neighbors = this.paths.filter(
      (path) => path.sourceId === nodeId || path.destinationId === nodeId,
    );
    return neighbors;
  }
}
