<template>
        <date-range-picker 
            :startDate="startDate" 
            :endDate="endDate"
            :locale-data="locale"
            :autoApply="autoApply"
            v-model="dateRange"
            @update="handleInput"
            :ranges="false"
            opens="right"
        >
        <!--Optional scope for the input displaying the dates -->
            <div slot="input" slot-scope="picker" style="width:100%;height:100%;" :class="inputclass">
                <span v-if="!!picker && !!picker.startDate && !!picker.endDate">
                    {{ moment(picker.startDate).format('YYYY-MM-DD') }} - {{ moment(picker.endDate).format('YYYY-MM-DD') }}
                </span>
                <span v-else>
                    Select dates
                </span>
            </div>
        </date-range-picker>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        value: {
            required: false
        },
        inputclass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            moment: moment,
            dateRange: '',
            startDate: '2017-09-05',
            endDate: '2017-09-15',
            autoApply: true,
            locale: {
                direction: 'ltr', //direction of text
                format: 'DD-MM-YYYY', //fomart of the dates displayed
                separator: ' - ', //separator between the two ranges
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                firstDay: 1 //ISO first day of week - see moment documenations for details
            }
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.dateRange);
        }
    }
}
</script>