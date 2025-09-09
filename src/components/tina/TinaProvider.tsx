import React from 'react'
import { TinaCMS, TinaProvider } from 'tinacms'
import client from '../../../tina/__generated__/client'
import { TinaCMS } from 'tinacms'

const TinaWrapper = ({ children }) => {
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        ...client,
        sidebar: {
          hidden: !import.meta.env.TINA_PUBLIC_IS_LOCAL,
        },
      }),
    []
  )
  return <TinaProvider cms={cms}>{children}</TinaProvider>
}

export default TinaWrapper
