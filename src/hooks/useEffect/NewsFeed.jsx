import React, { useState, useEffect } from "react"

import api from "../../_utils/api"
import analytics from "../../_utils/analytics"

import NewsItem from "./NewsItem"

export default function NewsFeed() {
  const loading = false
  const [newsItems, setNewsItems] = React.useState([])

  React.useEffect(loadData, [])
  React.useEffect(() => {
    if(newsItems.length > 10) {
      analytics.moreThanTenItemsShown()
    }
  }, [newsItems])

  function loadData( initialNewsItems = []) {
    // TODO: Update newsItems here
    api.todaysNews().then(newNewsItems => setNewsItems([...newsItems, ...newNewsItems]))
  }

  function onDismissAll() {
    // TODO: Update newsItems here
    setNewsItems([]);
  }

  function removeNewsItem(itemToRemove) {
    const newsItemsToKeep = newsItems.filter(item => item!== itemToRemove)
    // TODO: Update newsItems here
    setNewsItems(newsItemsToKeep)
  }

  return (
    <div>
      {newsItems.map((item) => (
        <NewsItem key={item.id} onDismiss={() => removeNewsItem(item)} {...item}/>
      ))}
      {loading && <span>Loading...</span>}
      {!loading && (
        <div>
          <button type="button" className="btn btn-primary" onClick={loadData}>
            Load {newsItems.length > 1 ? "More" : "Data"}
          </button>
          {newsItems.length > 1 && (
            <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={onDismissAll}
            >
              Dismiss All
            </button>
          )}
        </div>
      )}
    </div>
  )
}
