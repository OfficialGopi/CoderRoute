// ui/Skeleton.tsx
import clsx from "clsx";

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-red-950/50", className)}
    />
  );
};
