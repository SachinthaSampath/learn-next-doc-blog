import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  
  return (
    <Layout home>

      {/* The last given Head meta data is applied to the final output */}
      <Head>        
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>I am Sachintha. I was an Assistant Lecturer in IT and now a FullStack Dev Intern.</p>
        <p>
          I created this site as most of people are publishing this kind of sites to showcase their work. I am not with that particular purpose but created this to test NextJs features 😁.        </p>
          <p>(If you want to read NextJs docs, {" "}
            <a href="https://nextjs.org/learn">click here!</a>.)
            </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}


export async function getStaticProps() {
  //allPostData is fetched and sent to the page component from this
  const allPostsData = getSortedPostsData();
  // console.log(allPostsData);
  return {
    props: { allPostsData },
    //in page ->  ({allPostdata})
  };
}
