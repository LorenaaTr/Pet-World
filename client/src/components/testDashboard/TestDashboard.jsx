import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

const TestDashboard = () => {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report",
        id: "860f0d82-2c07-4fbe-b8fb-636732ce6efd",
        embedUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiZjk3NGRmNjgtNzRmYy00OTQwLWIzZWQtYzViYWE3YjQzZjJhIiwidCI6IjkyNTBmZTJlLTdhOWEtNDBlYy1hMzA2LTQ5ZDY5ODdhODI3MiIsImMiOjl9",
        accessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTI1MGZlMmUtN2E5YS00MGVjLWEzMDYtNDlkNjk4N2E4MjcyLyIsImlhdCI6MTY4NTU1NjQ1NCwibmJmIjoxNjg1NTU2NDU0LCJleHAiOjE2ODU1NjE5NzEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFDMHhJbFJhSFowbFBmaDYzZmdYWEUvSHJ0dHcwVjhYZjJNZUgzUzNiWjBhTWVvSHlxS0U1ektHVVJyRUxDL3ZiIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSGFsaWxpIiwiZ2l2ZW5fbmFtZSI6IkVkbW9uZCIsImlwYWRkciI6IjE4NS42Ny4xNzcuMjUwIiwibmFtZSI6IkVkbW9uZCBIYWxpbGkiLCJvaWQiOiI4N2Q0M2RlOS04NDdiLTQ5MDYtYjNmZS1iNjgwZjY1N2QzMGYiLCJwdWlkIjoiMTAwMzIwMDI0QjQ1QzY2NCIsInJoIjoiMC5BVjBBTHY1UWtwcDY3RUNqQmtuV21IcUNjZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQmRBTDQuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiTUV2M0hGLWRYa0hoZHd6VHlCRmlUbEM2RWt0WUZoZXdOeFBIYVlzRWZ6NCIsInRpZCI6IjkyNTBmZTJlLTdhOWEtNDBlYy1hMzA2LTQ5ZDY5ODdhODI3MiIsInVuaXF1ZV9uYW1lIjoiRWRtb25kLkhhbGlsaUBBUmFseXRpS1MuY29tIiwidXBuIjoiRWRtb25kLkhhbGlsaUBBUmFseXRpS1MuY29tIiwidXRpIjoiT3RGenZJbmdkRVNwR1U2VXJHZHpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.JVT8Ka84wfDCeIKAhjFw_V9hUy9YxyTIDdHZv1mD8Oq-uG4TfQVPvE6IuUWU32RhRNqcgQUW5W6LLJRdkCmxU0eb04tOnk0fq5sqwtVMOP3oHTkQL_Nu3xqwMEJaOGk2nELaVXVNfAvE3Ex6iraFTVwrHVHkzA-FThg0Zs6dz6aJ48fROLaR6KSQwj2_vVa6z8-n5_9rRyAykBHKAQfzu76eZuJ1BoSh-Pw52L5ievFUlwbS9FTkhR7yrrcAfryq44SxyFQJbamk4fAlhneC4l_4V6bPaR2ZOxlZUgSk3KqmrD9N53R2lriq3V3Uzax5GGXS4JFBHaugPaRozS3b2w",
        tokenType: models.TokenType.Embed,
        settings: {
          filterPaneEnabled: true,
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          }
        }
      }}
      eventHandlers={
        new Map([
          [
            "loaded",
            function () {
              console.log("Report loaded");
            }
          ],
          [
            "rendered",
            function () {
              console.log("Report rendered");
            }
          ],
          [
            "error",
            function (event) {
              console.log(event.detail);
            }
          ]
        ])
      }
      cssClassName={"report-style"}
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
};

export default TestDashboard;
