type Breadcrumb = {
  title: string;
  path?: string;
};

type BreadcrumbProps = {
  baseName: string;
  basePath: string;
};

export class ConstantBreadcrumbs {
  private readonly baseName: string;
  private readonly basePath: string;

  constructor({ baseName, basePath }: BreadcrumbProps) {
    this.baseName = baseName;
    this.basePath = basePath;
  }

  get list(): Breadcrumb[] {
    return [
      {
        title: this.baseName,
      },
    ];
  }

  get listPath(): Breadcrumb[] {
    return [
      {
        title: this.baseName,
        path: this.basePath,
      },
    ];
  }

  getCustomBreadcrumb(title: string): Breadcrumb[] {
    return [
      ...this.listPath,
      {
        title,
      },
    ];
  }
}
