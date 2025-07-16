import "./PageHeader.css";

const PageHeader = ({ hasGroup, breadcrumbsLink, breadcrumbsPath, heading, handleEvent, handleSearch, navigateTo = null, children }) => {
  return (
    <section className={`page-header ${!hasGroup ? "alt" : ""}`}>
      <div>
        <nav className="breadcrumbs">
          <ol className="breadcrumbs-list">
            <li className="breadcrumbs-item">
              <a href={navigateTo ? navigateTo : ""} className="breadcrumbs-label">
                {breadcrumbsLink}
              </a>
            </li>
            <li className="breadcrumbs-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="breadcrumbs-path">{breadcrumbsPath}</span>
            </li>
          </ol>
        </nav>
        <h1 className="heading-text">{heading}</h1>
      </div>
      {children && children}
      {hasGroup && (
        <div className="group2">
          <div className="group2-wrapper">
            <div className="search-input">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3rem"
                  height="1.3rem"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </div>
              <input type="search" placeholder="Search..." onChange={handleSearch}/>
            </div>
            <a className="group2-item" onClick={handleEvent}>
              <span>New Item</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default PageHeader;
