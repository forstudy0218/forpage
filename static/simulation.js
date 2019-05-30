var simulation = new Vue ({
    el: "#data_form",
    data: {
        data_list: [
            "A",
            "B",
        ],
        show_result: false,
        show_error: false,
        error_msg: "",
        avg_dict: {},
        st_dict: {},
        win_dict: {},
        draw_count: 0,
    },
    methods: {
        start_simulate: function(){
            this.show_error = false;
            this.show_result = false;
            const data_lists = {};
            for (let i = 0; i < this.data_list.length; i++){
                // get form info
                const st = document.querySelector("#" + this.data_list[i] + "_stamina");
                const sp_prob = document.querySelector("#" + this.data_list[i] + "_sp_prob");
                const fox_prob = document.querySelector("#" + this.data_list[i] + "_fox_prob");
                const exp_norm = document.querySelector("#" + this.data_list[i] + "_norm_exp");
                const exp_sp = document.querySelector("#" + this.data_list[i] + "_sp_exp");
                const exp_fox = document.querySelector("#" + this.data_list[i] + "_fox_exp");
                const data_name = this.data_list[i] + "_form_data";
                const lemma_list = [st.value, sp_prob.value, fox_prob.value, exp_norm.value, exp_sp.value, exp_fox.value];
                // check if input number
                for (let j = 0; j < lemma_list.length; j++) {
                    try {
                        lemma_list[j] = Math.floor(Number(lemma_list[j]));
                    } catch(error) {
                        this.error_msg = "not valid input";
                        this.show_error = true;
                    }
                    if (typeof lemma_list[j] !== "number" || lemma_list[j] < 0) {
                        lemma_list[j] = 0;
                    }
                }
                // save form data
                data_lists[data_name] = lemma_list;
                // save prob list
                const prob_name = this.data_list[i] + "_prob_list";
                data_lists[prob_name] = this.type_list(data_lists[data_name][1], data_lists[data_name][2]);
                // prob error handle
                if (typeof data_lists[prob_name] !== "object") {
                    return;
                }
                // prepare exp list
                const avg_name = this.data_list[i] + "_exp_list";
                data_lists[avg_name] = [];
                // prepare win count
                const count_name = this.data_list[i] + "_win_count";
                data_lists[count_name] = 0;
            }
            data_lists["draw_count"] = 0;
            for (let i = 0; i < 100; i++) {
                let compare_dict = {};
                for (let i = 0; i < this.data_list.length; i++) {
                    const dict_name = this.data_list[i] + "_exp";
                    // total exp in 100 stage
                    const data_api = this.data_list[i] + "_form_data";
                    const prob_api = this.data_list[i] + "_prob_list";
                    const exp_total = this.oneh_stages(data_lists[data_api][3], data_lists[data_api][4], data_lists[data_api][5], data_lists[prob_api]);
                    // save exp total for avg. cal.
                    const total_name = this.data_list[i] + "_exp_list";
                    data_lists[total_name].push(exp_total);
                    compare_dict[dict_name] = exp_total / (data_lists[data_api][0] * 100);
                }
                let top = 0;
                let win_case = [];
                for (let i = 0; i < this.data_list.length; i++) {
                    const current_name = this.data_list[i] + "_exp";
                    if (compare_dict[current_name] > top) {
                        win_case = [];
                        win_case.push(this.data_list[i]);
                        top = compare_dict[current_name];
                    } else if (compare_dict[current_name] === top) {
                        win_case.push(this.data_list[i]);
                    }
                }
                if (win_case.length < 1) {
                    this.error_msg = "simulation error";
                    this.show_error = true;
                } else if (win_case.length > 1) {
                    data_lists["draw_count"] ++;
                } else if (win_case.length === 1) {
                    const win_name = win_case[0] + "_win_count";
                    data_lists[win_name]++;
                }
            }
            // result for each case
            for (let i = 0; i < this.data_list.length; i++) {
                // avg exp
                const avg_nm = this.data_list[i] + "_exp_list";
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                this.avg_dict[this.data_list[i]] = data_lists[avg_nm].reduce(reducer) / data_lists[avg_nm].length;
                // get data
                const data_nm = this.data_list[i] + "_form_data";
                // total st cost
                // get st data
                this.st_dict[this.data_list[i]] = data_lists[data_nm][0] * 100;
                // win count
                const win_nm = this.data_list[i] + "_win_count";
                this.win_dict[this.data_list[i]] = data_lists[win_nm];
            }
            this.draw_count = data_lists["draw_count"];
            this.show_result = true;
        },
        type_list: function(num_sp, num_fox) {
            // valid prob
            const total_prob = num_sp + num_fox;
            if (total_prob <= 100 && total_prob >= 0) {
                // list for random
                const type_list = [];
                for (let i = 0; i < num_sp; i++) {
                    type_list.push(1);
                }
                for (let i = 0; i < num_fox; i++) {
                    type_list.push(2);
                }
                while (type_list.length < 100) {
                    type_list.push(0);
                }
                return type_list;
            // not valid
            } else {
                this.error_msg = "not valid prob";
                this.show_error = true;
            }
        },
        oneh_stages: function(norm, sp, fox, prob_list) {
            let exp = 0;
            for (let i = 0; i < 100; i++) {
                let index = Math.floor(Math.random() * (prob_list.length));
                let type_id = prob_list[index];
                if (type_id === 0) {
                    exp += norm;
                } else if (type_id === 1) {
                    exp += sp;
                } else if (type_id === 2) {
                    exp += fox;
                }
            }
            return exp;
        },
        add_case: function() {
            if (this.data_list.length < 26) {
                const utf_16 = this.data_list[this.data_list.length - 1].charCodeAt(0) + 1;
                this.data_list.push(String.fromCharCode(utf_16));
                this.show_result = false;
            }
        },
        delete_case: function() {
            if (this.data_list.length > 2) {
                this.data_list.pop();
                this.show_result = false;
            }
        },
    }
})