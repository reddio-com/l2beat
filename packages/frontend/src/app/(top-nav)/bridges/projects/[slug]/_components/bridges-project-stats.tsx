import { type ReactNode } from 'react'
import { NoDataBadge } from '~/components/badge/no-data-badge'
import {
  TokenBreakdown,
  TokenBreakdownTooltipContent,
} from '~/components/breakdown/token-breakdown'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/core/tooltip/tooltip'
import { SentimentText } from '~/components/sentiment-text'
import { ValueWithPercentageChange } from '~/components/table/cells/value-with-percentage-change'
import { InfoIcon } from '~/icons/info'
import { RoundedWarningIcon } from '~/icons/rounded-warning'
import { type BridgesProjectEntry } from '~/server/features/bridges/project/get-bridges-project-entry'
import { cn } from '~/utils/cn'
import { formatCurrency } from '~/utils/number-format/format-currency'

interface Props {
  project: BridgesProjectEntry
}

export function BridgesProjectStats({ project }: Props) {
  const isAnyTokenWarningBad = project.header.tvl?.tokenBreakdown.warnings.some(
    (warning) => warning.sentiment === 'bad',
  )

  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-100 dark:bg-zinc-900 md:grid-cols-4 md:px-6 md:py-5">
      <ProjectStat
        title="Total value locked"
        tooltip="Total value locked in escrow contracts on Ethereum displayed together with a percentage change compared to 7D ago."
        value={
          !project.isUpcoming && project.header.tvl ? (
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <span className="flex items-center gap-2">
                    {project.header.tvl.tokenBreakdown.warnings.length > 0 && (
                      <RoundedWarningIcon
                        sentiment={isAnyTokenWarningBad ? 'bad' : 'warning'}
                        className="size-4"
                      />
                    )}
                    <ValueWithPercentageChange
                      className="font-bold"
                      changeClassName="text-base font-medium"
                      change={project.header.tvl.tvlBreakdown.totalChange}
                    >
                      {formatCurrency(
                        project.header.tvl.tvlBreakdown.total,
                        'usd',
                      )}
                    </ValueWithPercentageChange>
                  </span>
                  <TokenBreakdown
                    {...project.header.tvl.tokenBreakdown}
                    className="h-[3px] w-full"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <TokenBreakdownTooltipContent
                  {...project.header.tvl.tokenBreakdown}
                  associatedTokenSymbols={
                    project.header.tvl.tokenBreakdown.associatedTokens
                  }
                  tvlWarnings={project.header.tvl.tokenBreakdown.warnings}
                />
              </TooltipContent>
            </Tooltip>
          ) : (
            <NoDataBadge />
          )
        }
      />
      <ProjectStat
        title="Destination"
        value={
          <SentimentText
            sentiment={project.header.destination.sentiment}
            className="text-lg font-medium !leading-none md:text-xl md:font-bold"
          >
            {project.header.destination.value}
          </SentimentText>
        }
      />
      <ProjectStat
        title="Validated by"
        value={
          project.header.validatedBy ? (
            <SentimentText
              sentiment={project.header.validatedBy.sentiment}
              className="text-lg font-medium !leading-none md:text-xl md:font-bold"
            >
              {project.header.validatedBy.value}
            </SentimentText>
          ) : (
            <NoDataBadge />
          )
        }
      />
      <ProjectStat title="Type" value={project.header.category} />
    </div>
  )
}

interface ProjectStat {
  title: string
  value: ReactNode
  tooltip?: string
  className?: string
}

function ProjectStat(props: ProjectStat) {
  return (
    <li
      className={cn(
        'flex items-center justify-between md:flex-col md:items-start md:justify-start md:gap-3',
        props.className,
      )}
    >
      <div className="flex flex-row gap-1.5">
        <span className="text-xs text-gray-500 dark:text-gray-600">
          {props.title}
        </span>
        {props.tooltip && (
          <Tooltip>
            <TooltipTrigger className="-translate-y-px md:translate-y-0">
              <InfoIcon className="mt-0.5 md:size-3.5" variant="gray" />
            </TooltipTrigger>
            <TooltipContent>{props.tooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>

      <span className="text-lg font-medium !leading-none md:text-xl md:font-bold">
        {props.value}
      </span>
    </li>
  )
}
